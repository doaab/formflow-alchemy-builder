
// Export all Arabic translations
import { auth } from './auth';
import { navigation } from './navigation';
import { dashboard } from './dashboard';
import { Landing } from './landing';
import { subscriptions } from './subscriptions';
import { plans } from './plans';
import { survey } from './survey';
import { misc } from './misc';
import { ads } from './ads';
import { customerService } from './customerService';
import { reviews } from './reviews';
import { coupons } from './coupons';

export const ar = {
  ...auth,
  ...Landing,
  ...navigation,
  ...dashboard,
  ...subscriptions,
  ...plans,
  ...survey,
  ...misc,
  ...ads,
  ...customerService,
  ...reviews,
  ...coupons,
};
