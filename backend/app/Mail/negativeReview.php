<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class negativeReview extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $subject = 'اشعار بوجود تقييم سلبي';
        return $this->markdown('Mails.negative_review')->subject($subject)->with([
            'data' => $this->data
        ]);
    }
}
