<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::post('/uuid', function() {

//     // Generate 16 bytes (128 bits) of random data or use the data passed into the function.
//     $data = $data ?? random_bytes(16);
//     assert(strlen($data) == 16);

//     // Set version to 0100
//     $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
//     // Set bits 6-7 to 10
//     $data[8] = chr(ord($data[8]) & 0x3f | 0x80);

//     // Output the 36 character UUID.
//     $uuid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));

//     $checkUser = User::where('uuid', $uuid)->exists();

//     if($checkUser){
//         return response()->json([
//             "status" => false,
//             "message" => "Une erreur est survenue, veuillez recommencer..."
//         ]);
//     } else {
//         return response()->json([
//             "status" => true,
//             "uuid" => $uuid
//         ]);
//     }

// });

// Route::group([
//     'middleware' => 'api',
//     'prefix' => 'auth'
// ], function ($router) {
//     Route::post('/login', [AuthController::class, 'login']);
//     Route::post('/register', [AuthController::class, 'register']);
//     Route::post('/logout', [AuthController::class, 'logout']);
//     Route::post('/refresh', [AuthController::class, 'refresh']);
//     Route::get('/user-profile', [AuthController::class, 'userProfile']);    
//     Route::post('/check', [AuthController::class, 'check']);
// });