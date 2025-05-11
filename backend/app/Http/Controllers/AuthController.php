<?php
namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use App\Models\ValidateOtp;
use App\Utilities\Constance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        $token = $user->createToken('auth_token')->accessToken;

        return response()->json([
            'user' => $user,
            'access_token' => $token,
            'message' => 'User registered successfully',
        ]);
    }

    public function login(Request $request)
    {
        // Retrieve the store based on the provided email and state
        $store = Store::where('email', $request->email)->where('state', "!=", Constance::itemDeleted)->first();
         // Check if the login type is 'phone'
        if (isset($request->type) && $request->type == 'phone') {
            // Generate a random OTP ID and OTP
            $randomOtpID = substr(str_shuffle("0123456789abcdefghijklmnopqrstvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 6);
            $randomOtp = random_int(100000, 999999);

            // Send the OTP request
            $this->otpRequest('00966' . $request->phone, $randomOtp);

            // Create a new OTP validation record
            ValidateOtp::create([
                'otp_id' => $randomOtpID,
                'otp' => $randomOtp,
                'type' => Constance::validateOtpTypePhone
            ]);

            // Prepare the response
            $response = [
                'data' => [
                    'phone' => $request->phone,
                    'otp_id' => $randomOtpID,
                ]
            ];
            return response()->json(['message' => 'Verification code has been sent successfully'], 201);
        } else {
            // Check if the store exists
            if ($store) {
                // Determine the store ID
                $storeId = $store->store_id ? $store->store_id : $store->id;
                // Check if the store has a parent store
                if ($store->store_id) {
                    // Retrieve the parent store
                    $parentStore = Store::where('id', $store->store_id)->where('state', "!=", Constance::itemDeleted)->first();

                    // Check if the parent store has a free subscription type
                    if ($parentStore->subscription_type == Constance::subscriptionTypeFree) {
                        $response = [
                            'code' => "02_00_01"
                        ];

                        return response()->json(['message' => 'Please renew your company account package'], 400);
                    }
                }

                // Check the state of the store
                if ($store->state == Constance::itemActivated || $store->state == Constance::itemNoPayment) {
                    // Check if the provided password matches the store's password
                    if (Hash::check($request->password, $store->password)) {
                        // Check if the store's email has been verified
                        if ($store->email_verified_at == null) {
                            // Verify the email after login
                            $this->emailVerifiedAfterLogin($request->email);
                        }

                        // Determine the role based on the store's subscription type
                        $role = '';
                        if ($store->subscription_type == Constance::subscriptionTypeFree) {
                            $role = 'free';
                        }
                        if ($store->subscription_type == Constance::subscriptionTypeMedium) {
                            $role = 'professional';
                        }
                        if ($store->subscription_type == Constance::subscriptionTypeProfessional) {
                            $role = 'professional';
                        }

                        $token = $store->createToken('auth_token')->accessToken;
                        // Create a token for the store
                        $store['token'] = $store->createToken('StoreApp')->accessToken;

                        // Prepare the response
                        $response = [
                            'data' => [
                                "token_type" => "Bearer",
                                "expires_in" => now()->addDays(30)->diffInSeconds(),
                                "token" => $store->token,
                                "remember_me" => false
                            ],
                        ];
                        return response()->json([
                            "token_type" => "Bearer",
                            "expires_in" => now()->addDays(30)->diffInSeconds(),
                            "access_token" => $store->token,
                            "remember_me" => false,
                            "message" => "User logged in successfully",
                        ],201);
//                        return response()->json(['message' => 'Store login successfully.'], 201);
                    } else {
                        $response = [
                            'code' => '01_02',
                        ];

                        return response()->json(['message' => 'The password is incorrect'], 400);
                        // Return an error response
//                        return $this->baseController->sendError('The password is incorrect', $response, 400);
                    }
                } else {
                    $response = [
                        'code' => '01_08',
                    ];

                    return response()->json(['message' => 'Account stopped'], 400);
                }
            } else {
                $response = [
                    'code' => '01_01',
                ];

                return response()->json(['message' => 'There is no account registered with this email.'], 400);
            }
        }
//        $credentials = $request->validate([
//            'email' => 'required|email',
//            'password' => 'required',
//        ]);
//
//        if (Auth::attempt($credentials)) {
//            $user = Auth::user();
//            $token = $user->createToken('auth_token')->accessToken;
//
//            return response()->json([
//                'user' => $user,
//                'access_token' => $token,
//                'message' => 'User logged in successfully',
//            ]);
//        }
//        if (Hash::check($request->password, $store->password)) {
//            // Check if the store's email has been verified
//            if ($store->email_verified_at == null) {
//                // Verify the email after login
//                $this->emailVerifiedAfterLogin($request->email);
//            }
//        }
            // Determine the role based on the store's subscription type
//            $role = '';
//            if ($store->subscription_type == Constance::subscriptionTypeFree) {
//                $role = 'free';
//            }
//            if ($store->subscription_type == Constance::subscriptionTypeMedium) {
//                $role = 'professional';
//            }
//            if ($store->subscription_type == Constance::subscriptionTypeProfessional) {
//                $role = 'professional';
//            }

            // Create a token for the store
//            $store['token'] = $store->createToken('StoreApp', [$role])->accessToken;
//
//            // Prepare the response
//            $response = [
//                'data' => [
//                    "token_type" => "Bearer",
//                    "expires_in" => now()->addDays(30)->diffInSeconds(),
//                    "token" => $store->token,
//                    "remember_me" => false
//                ],
//            ];

//        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'User logged out successfully']);
    }

    public function user(Request $request)
    {
        return response()->json(['user' => $request->user()]);
    }

//    public function getForms(Request $request)
//    {
//// استخدم FormService لجلب النماذج
//        $formService = app(\App\Services\FormService::class);
//        $forms = $request->user()->forms; // افترض أن لديك علاقة في نموذج User
//        return response()->json($forms);
//    }
}
