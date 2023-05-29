<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request){

        $uuid = request("uuid");
        $user = User::where('uuid', $uuid)->first();
        if(! $token = Auth::login($user)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }
    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'uuid' => 'required|unique:users',
            'name' => 'required|string|between:2,100|unique:users'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $user = User::create(array_merge($validator->validated(),
            ["role_id" => 2],
        ));

        // $curlDeux = curl_init();
    
        // curl_setopt_array($curlDeux, array(
        // CURLOPT_URL => 'https://discordapp.com/api/webhooks/1068419041515020338/evePP0ho5OOM5PKCQUf0rBwjP6q4U6RtfiRPa1cuqGzxEi8VAOy6rGrOPEXJrX_1KlWR',
        // CURLOPT_RETURNTRANSFER => true,
        // CURLOPT_ENCODING => '',
        // CURLOPT_MAXREDIRS => 10,
        // CURLOPT_TIMEOUT => 0,
        // CURLOPT_FOLLOWLOCATION => true,
        // CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        // CURLOPT_CUSTOMREQUEST => 'POST',
        // CURLOPT_POSTFIELDS =>'{
        //     "content": "[Equativa] - L\'utilisateur ['.request('name').'] s\'est inscrit sur la plateforme."
        // }',
        // CURLOPT_HTTPHEADER => array(
        //     'Content-Type: application/json'
        // ),
        // ));

        // $responseDeux = curl_exec($curlDeux);

        // curl_close($curlDeux);

        return response()->json([
            'message' => 'Votre compte a été créer avec succès.',
            'user' => $user
        ], 201);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }

    public function check() {

        return response()->json(auth()->check());
    
    }

}