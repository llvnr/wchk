<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Support\Facades\Log;

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

Route::group([
    'prefix' => 'wstachecker'
], function ($router) {

    Route::post('/checkdomain', function() {

        $url = request('url');
        $clientIP = request()->ip();
    
        if(isSiteAvailible($url)){

            Log::info("[WSTACHECKER] - Le service a vérifier un site. Résultat : En ligne");
    
            return response()->json([
                "status" => true,
                "message" => "Le site est en ligne."
            ]);
    
        }else{

            Log::info("[WSTACHECKER] - Le service a vérifier un site. Résultat : Hors ligne");
    
            return response()->json([
                "status" => true,
                "message" => "Le site n'est pas en ligne."
            ]);
    
        }
    
    });

});

function isSiteAvailible($url){

    // Check, if a valid url is provided
    if(!filter_var($url, FILTER_VALIDATE_URL)){
        return false;
    }

    // Initialize cURL
    $curlInit = curl_init($url);
    
    // Set options
    curl_setopt($curlInit,CURLOPT_CONNECTTIMEOUT,10);
    curl_setopt($curlInit,CURLOPT_HEADER,true);
    curl_setopt($curlInit,CURLOPT_NOBODY,true);
    curl_setopt($curlInit,CURLOPT_RETURNTRANSFER,true);

    // Get response
    $response = curl_exec($curlInit);
    
    // Close a cURL session
    curl_close($curlInit);

    return $response?true:false;

}
