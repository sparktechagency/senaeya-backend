import mongoose from 'mongoose';
import colors from 'colors';
import config from '../config';
import { logger } from '../shared/logger';
import Settings from '../app/modules/settings/settings.model';

// Default settings values. Adjust as needed.
const defaultSettings = {
  privacyPolicy: 'Privacy Policy',
  aboutUs: 'About Us',
  support: 'Support',
  termsOfService: 'Terms of Service',
};

const seedSettings = async () => {
  try {
    logger.info(colors.cyan('🎨 --------------> Settings seeding start <--------------- 🎨'));

    // Ensure a single Settings document exists. Create if not exists, otherwise update fields.
    const result = await Settings.findOneAndUpdate(
      {},
      { $setOnInsert: defaultSettings },
      { upsert: true, new: true }
    );

    // If a document already existed, optionally ensure required fields are present
    // without overwriting non-empty values.
    let modified = false;
    const updates: Partial<Record<keyof typeof defaultSettings, string>> = {};

    (Object.keys(defaultSettings) as Array<keyof typeof defaultSettings>).forEach((key) => {
      const currentVal = (result as any)[key];
      if (currentVal === undefined) {
        updates[key] = defaultSettings[key];
        modified = true;
      }
    });

    if (modified) {
      await Settings.updateOne({ _id: result._id }, { $set: updates });
      logger.info(colors.green('✨ Settings document updated with missing fields'));
    }

    logger.info(colors.green('✨ --------------> Settings seeded successfully <-------------- ✨'));
  } catch (error) {
    logger.error(colors.red('💥 Error seeding settings: 💥'), error);
    process.exitCode = 1;
  }
};

// Connect, seed, and disconnect
(async () => {
  try {
    await mongoose.connect(config.database_url as string);
    await seedSettings();
  } catch (err) {
    logger.error(colors.red('🔥 Error in settings seeding bootstrap: 🔥'), err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
