<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class googleBranch extends Mailable
{
    use Queueable, SerializesModels;


    public $data;

    public function __construct($data)
    {
        $this->data = $data;

    }

    public function build()
    {
        $subject ='طلب مراجعة فرع جوجل ';
        return $this->markdown('Mails.google_branch')->subject($subject)->with([
            'data' => $this->data
            ]);
    }
}
