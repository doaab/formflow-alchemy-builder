<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\WaServiceSubscriptions;
use App\Models\WaSubscriptions;
use App\Models\WaSubscriptionsFeatureDescription;
use Illuminate\Http\Request;

class PackagesController extends Controller
{

    /**
     * Get the packages with their prices and features.
     *
     * @return \Illuminate\Http\Response
     */
    public function getPackages(Request $request)
    {
        // Get and validate locale from query parameter
        $locale = $request->query('lang', config('app.locale', 'ar')); // Default to app.locale or 'ar'
        $allowedLocales = ['ar', 'en']; // Define allowed locales
        if (!in_array($locale, $allowedLocales)) {
            $locale = config('app.locale', 'ar'); // Fallback if invalid
        }

        // Optionally store locale in session
        session(['locale' => $locale]);

        // Fetch subscriptions with eager loading
        $subscriptions = WaSubscriptions::select([
            'id',
            "name_{$locale} as name",
        ])
            ->with([
                'serviceSubscriptions' => fn($query) => $query->select([
                    'id',
                    'wa_subscription_id',
                    'period',
                    'old_price',
                    'price',
                ]),
                'featureDescriptions' => fn($query) => $query->select([
                    'id',
                    'wa_subscription_id',
                    "title_{$locale} as title",
                    'supported',
                ]),
            ])
            ->get();

        // Map subscriptions to response format
        $packages = $subscriptions->map(fn($subscription) => [
            'id' => $subscription->id,
            'name' => $subscription->name,
            'prices' => $subscription->serviceSubscriptions,
            'features' => $subscription->featureDescriptions,
        ])->values()->toArray();

        // Build response
        $response = [
            'message' => __('Packages retrieved successfully'),
            'data' => [
                'content' => $packages,
            ],
        ];

        return response()->json($response, 200); // Use 200 for successful GET

    }


}
