<?php

return [

    // Configuration file for Laravel Logins package
    // https://github.com/alajusticia/laravel-logins

    /*
    |--------------------------------------------------------------------------
    | Database connection
    |--------------------------------------------------------------------------
    |
    | The database connection to use to save the logins, this is optional.
    |
    | If not provided, it will use the default database connection of your
    | application.
    |
    */
    'database_connection' => env('SESSION_CONNECTION'),

    /*
    |--------------------------------------------------------------------------
    | Sanctum token tracking
    |--------------------------------------------------------------------------
    |
    | Set this to true if you want to enable Logins for Sanctum personal
    | access tokens (when issuing tokens).
    |
    | Note: This is not required to track stateful Sanctum authentications
    | (like with Inertia.js).
    |
    */
    'sanctum_token_tracking' => false,


    /*
    |--------------------------------------------------------------------------
    | Sanctum token name patterns
    |--------------------------------------------------------------------------
    |
    | When tracking is enabled for Sanctum personal access tokens, you can
    | define a regular expression if you want to enable it only for tokens
    | whose name matches the defined pattern.
    |
    | To enable Logins for all tokens, leave this empty.
    |
    */
    'sanctum_token_name_regex' => '',

    /*
    |--------------------------------------------------------------------------
    | Parser
    |--------------------------------------------------------------------------
    |
    | Choose which parser to use to parse the User-Agent.
    | You will need to install the package of the corresponding parser.
    |
    | Supported values:
    | 'agent' (see https://github.com/jenssegers/agent)
    | 'whichbrowser' (see https://github.com/WhichBrowser/Parser-PHP)
    |
    */

    'parser' => 'whichbrowser',

    /*
    |--------------------------------------------------------------------------
    | IP address geolocation
    |--------------------------------------------------------------------------
    |
    | Add geolocation information to tracked logins.
    |
    | This feature uses this package: https://github.com/stevebauman/location
    | Refer to its documentation to configure a driver.
    |
    */

    'ip_geolocation' => [

        /*
        |----------------------------------------------------------------------
        | Environments
        |----------------------------------------------------------------------
        |
        | Indicate here an array of environments for which you want to enable
        | IP address geolocation.
        |
        | Leave it empty to totally disable the geolocation.
        |
        */

        'environments' => [
            'production',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | New login notification
    |--------------------------------------------------------------------------
    |
    | Register here the notification class to use to notify the user when a
    | new login occurs.
    |
    | Laravel Logins comes with a ready-to-use notification, or you can use
    | your own.
    |
    | If you don't want this package to send notification, or if you want to
    | use your own logic/listener, set the value to false.
    |
    */

    'new_login_notification' => \ALajusticia\Logins\Notifications\NewLogin::class,

    /*
    |--------------------------------------------------------------------------
    | Security page route
    |--------------------------------------------------------------------------
    |
    | Indicate here the route name for the page where users can find security
    | settings (such as password modification and a list of recent sessions).
    | If defined, a URL to your security page will be included in email
    | notifications.
    |
    */

    'security_page_route' => null,
];
