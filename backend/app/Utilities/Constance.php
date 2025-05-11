<?php

namespace App\Utilities;

class Constance
{
    /**
     * @var @maleGender used in users table
     */
    const maleGender = 1;

    /**
     * @var @femaleGender used in users table
     */
    const femaleGender = 2;

    /**
     * @var @userActivated used in users table
     */
    const userActivated = 1;

    /**
     * @var @userDisabled used in users table
     */
    const userDisabled = 2;

    /**
     * @var @userBlocked used in users table
     */
    const userBlocked = 3;

    /**
     * @var @storesCategoryActivated used in stores_categories table
     */
    const storesCategoryActivated = 1;

    /**
     * @var @storesCategoryDisabled used in stores_categories table
     */
    const storesCategoryDisabled = 2;

    /**
     * @var @alwaysTime used in stores table
     */
    const alwaysTime = 1;

    /**
     * @var @alwaysOpen used in stores table
     */
    const alwaysOpen = 2;

    /**
     * @var @alwaysClose used in stores table
     */
    const alwaysClose = 3;

    /**
     * @var @storesActivated used in stores table
     */
    const storesActivated = 1;

    /**
     * @var @storesDisabled used in stores table
     */
    const storesDisabled = 2;

    /**
     * @var @storesCategorized used in stores table
     */
    const storesUnCategorized = 1;

    /**
     * @var @storeDocsPath used in stores table
     */
    const storeDocsPath = '/stores/docs/';

    /**
     * @var @storesInfoCategoryActivated used in stores_info_categories table
     */
    const storesInfoCategoryActivated = 1;

    /**
     * @var @storesInfoCategoryDisabled used in stores_info_categories table
     */
    const storesInfoCategoryDisabled = 2;

    /**
     * @var @storesInfoCategoryString used in stores_info_categories table
     * Should always be the same of id in database
     */
    const storesInfoCategoryString = 1;

    /**
     * @var @storesInfoCategoryArray used in stores_info_categories table
     * Should always be the same of id in database
     */
    const storesInfoCategoryArray = 2;

    /**
     * @var @storesInfoActivated used in stores_infos table
     */
    const storesInfoActivated = 1;

    /**
     * @var @storesInfoDisabled used in stores_infos table
     */
    const storesInfoDisabled = 2;

    /**
     * @var @MediaCategoryActivated used in media_categories table
     */
    const MediaCategoryActivated = 1;

    /**
     * @var @MediaCategoryDisabled used in media_categories table
     */
    const MediaCategoryDisabled = 2;

    /**
     * @var @MediaCategoryExtjpg used in media_categories table
     */
    const MediaCategoryExt_jpg = 1;

    /**
     * @var @MediaCategoryExtpng used in media_categories table
     */
    const MediaCategoryExt_png = 2;

    /**
     * @var @MediaCategoryExtpdf used in media_categories table
     */
    const MediaCategoryExt_pdf = 3;

    /**
     * @var @MediaActivated used in medias table
     */
    const MediaActivated = 1;

    /**
     * @var @MediaDisabled used in medias table
     */
    const MediaDisabled = 2;

    /**
     * @var @storesSectionsActivated used in stores_sections table
     */
    const storesSectionsActivated = 1;

    /**
     * @var @storesSectionsDisabled used in stores_sections table
     */
    const storesSectionsDisabled = 2;

    /**
     * @var @storesSectionsDeleted used in stores_sections table
     */
    const storesSectionsDeleted = 3;

    /**
     * @var @storeQuestionsActivated used in Questions_Reviews table
     */
    const storeQuestionsActivated = 1;

    /**
     * @var @storeQuestionsDisabled used in Questions_Reviews table
     */
    const storeQuestionsDisabled = 2;

    /**
     * @var @storeQuestionsDeleted used in Questions_Reviews table
     */
    const storeQuestionsDeleted = 3;



    /**
     * @var @c used in Questions_Reviews table
     */
    const campaignActivated = 1;

    /**
     * @var @CampaignDisabled used in Questions_Reviews table
     */
    const campaignDisabled = 2;

    /**
     * @var @CampaignDeleted used in Questions_Reviews table
     */
    const campaignDeleted = 3;



    /**
     * @var @storesReviewsActivated used in stores_reviews table
     */
    const storesReviewsActivated = 1;

    /**
     * @var @storesReviewsDisabled used in stores_reviews table
     */
    const storesReviewsDisabled = 2;

    /**
     * @var @storesReviewsVisible used in stores_reviews table
     */
    const storesReviewsVisible = 2;

    /**
     * @var @storesReviewsHidden used in stores_reviews table
     */
    const storesReviewsHidden = 1;

    /**
     * @var @storesSectionsReviewActivated used in stores_sections_reviews table
     */
    const storesSectionsReviewActivated = 1;

    /**
     * @var @storesSectionsReviewDisabled used in stores_sections_reviews table
     */
    const storesSectionsReviewDisabled = 2;

    /**
     * @var @storesSectionsReviewVisible used in stores_sections_reviews table
     */
    const storesSectionsReviewVisible = 2;

    /**
     * @var @storesSectionsReviewHidden used in stores_sections_reviews table
     */
    const storesSectionsReviewHidden = 1;


    /**
     * @var @itemActivated used in Questions_Reviews table
     */
    const itemActivated = 1;

    /**
     * @var @itemDisabled used in Questions_Reviews table
     */
    const itemDisabled = 2;

    /**
     * @var @itemDeleted used in Questions_Reviews table
     */
    const itemDeleted = 3;

    /**
     * @var @itemDeleted used in Questions_Reviews table
     */
    const itemNoPayment = 4;

    const randomlyGenerateLinkTrue = 1;
    const randomlyGenerateLinkFalse = 0;

    const typeChangeState = 1;
    const typeChangeIsShow = 2;

    const itemVisible = 1;
    const itemHidden = 2;

    const paymentTypeRenewAnAccount = 1;
    const paymentTypeBuyPoints = 2;

    const operationTypeRechargeTheBalance = 1;
    const operationTypeBalanceWithdrawal = 2;
    const operationTypeReviews = 3;



    const googleReviewBranchesUnderReview = 1;
    const googleReviewBranchesRejected = 2;
    const googleReviewBranchesAccepted = 3;


    /**
     * Questions Types
     */
    const questionTypeChoices = 1;
    const questionTypeStars = 2;
    const questionTypeTextInput = 3;
    const questionTypeFaces = 4;
    const questionTypeDate = 5;
    const questionTypeNPS = 6;
    const questionTypeMultiChoice = 7;
    const questionTypeCSAT = 8;
    const questionTypeAudio = 9;
    const questionTypeInformation = 10;
    const questionTypePerformance = 11;
    const questionTypeSlider = 12;
    const questionTypeFiles = 13;
    const questionTypeToggle = 14;




    /**
     * Subscription Types
     */
    const subscriptionTypeFree = 1;
    const subscriptionTypeMedium = 2;
    const subscriptionTypeProfessional = 3;


    /**
     * Subscription Period
     */
    const subscriptionPeriodOpen = 1;
    const subscriptionPeriodMonth = 2;
    const subscriptionPeriodYear = 3;





    const validateOtpTypePhone = 1;
    const validateOtpTypeEmail = 2;


    const itemIsReadFalse = 1;
    const itemIsReadTrue = 2;
    const itemNotRead = 0;
    const itemIsRead = 1;


    const campaignTypeFree = 1;
    const campaignTypePaid = 2;
    const campaignTypeCoupon = 3;


    const rewardTypeMessage = 1;
    const rewardTypePoints = 2;
    const rewardTypeCouponMultiUse = 3;
    const rewardTypeCouponSingleUse = 4;


    const couponTypeMultiUse = 1;
    const couponTypeSingleUse = 2;
}
