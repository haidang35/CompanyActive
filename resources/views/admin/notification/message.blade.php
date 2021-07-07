@if(isset($notification))
<a style="padding: 13px" href="#">
    {{$notification->data['user']['name']}} just got an action.
</a>
    @endif

