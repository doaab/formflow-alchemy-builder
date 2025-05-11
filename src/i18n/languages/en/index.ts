
// Export all English translations
import { auth } from './auth';
import { navigation } from './navigation';
import { Landing } from './landing';
import { dashboard } from './dashboard';
import { subscriptions } from './subscriptions';
import { plans } from './plans';
import { survey } from './survey';
import { misc } from './misc';
import { ads } from './ads';
import { customerService } from './customerService';
import { reviews } from './reviews';
import { coupons } from './coupons';

export const en = {
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
