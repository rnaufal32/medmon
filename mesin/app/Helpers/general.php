<?php

if (!function_exists('validateDate')) {
    function validateDate($date) {
        if (!$date) {
            return false;
        }
    
        $formats = ['Y-m-d H:i:s', 'Y-m-d'];
        foreach ($formats as $format) {
            try {
                return \Carbon\Carbon::createFromFormat($format, $date)->startOfDay();;
            } catch (\Exception $e) {
                continue;
            }
        }
    
        return false;
    }
}