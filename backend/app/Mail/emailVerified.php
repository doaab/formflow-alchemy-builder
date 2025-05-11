<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class emailVerified extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;

    }

    public function build()
    {
        $subject = 'رمز التحقق لتأكيد الحساب من فيدباك';
        return $this->markdown('Mails.email_verified')->subject($subject)->with([
            'data' => $this->data
            ]);
    }
}
