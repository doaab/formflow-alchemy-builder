<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class linkEmailVerified extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        $subject = 'تفعيل الحساب الخاص بك في فيدباك';
        return $this->markdown('Mails.link_email_verified')->subject($subject)->with([
            'data' => $this->data
        ]);
    }
}
