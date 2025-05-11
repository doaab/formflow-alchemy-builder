<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class subExpiry extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $subject = ' انتهاء اشتراكك في فيدباك';
        return $this->markdown('Mails.subscription_expiry')->subject($subject)->with([
            'data' => $this->data
        ]);
    }
}
