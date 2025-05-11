<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class register extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;

    }

    public function build()
    {
        $subject = $this->data['name'] . ' سجل في منصة فيدباك ';
        return $this->markdown('Mails.register')->subject($subject)->with([
            'data' => $this->data
        ]);
    }
}
