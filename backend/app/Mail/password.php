<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class password extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;
    }


    public function build()
    {
        $subject = 'كلمة المرور الخاصة بك في فيدباك';
        return $this->markdown('Mails.password')->subject($subject)->with([
            'data' => $this->data
        ]);
    }
}
