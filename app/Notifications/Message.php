<?php

namespace App\Notifications;

use App\Events\Notify;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\DatabaseMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Carbon;

class Message extends Notification implements ShouldBroadcast
{
    use Queueable;
    protected $appointment;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($appointment)
    {
        $this->appointment = $appointment;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'mail', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable

     */
    public function toMail($notifiable) {
//        \Illuminate\Support\Facades\Notification::route('mail', $this->appointment['to']);
        return (new MailMessage)
            ->subject("Company Active ")
            ->greeting($this->appointment["name"])
            ->line($this->appointment["body"])
            ->action("Go to website",$this->appointment['url'])
            ->line($this->appointment['thanks']);

    }

    public function toDatabase($notifiable)
    {
        return[
            'appoint'=>$this->appointment,
            'user'=>auth()->user(),
        ];

    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [

        ];
    }

    public function toBroadcast($notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->appointment
        ]);

    }


}
