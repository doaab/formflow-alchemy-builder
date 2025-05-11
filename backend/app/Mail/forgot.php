<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class forgot extends Mailable
{
    use Queueable, SerializesModels;

    public $data;

    public function __construct($data)
    {
        $this->data = $data;

    }


    public function build()
    {
        $subject ='اعادة تعيين كلمة المرور من فيدباك';
        return $this->markdown('Mails.forgot')->subject($subject)->with([
            'data' => $this->data
            ]);
    }
}
