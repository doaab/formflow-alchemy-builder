<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class contact extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;

    }

    public function build()
    {
        $subject =' ارسل رسالة جديدة ' .  $this->data['name'];
        return $this->markdown('Mails.connect')->subject($subject)->with([
            'data' => $this->data
            ]);
    }
}
