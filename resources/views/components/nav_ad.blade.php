<div id="main" class='layout-navbar'>
    <header class='mb-3'>
        <nav class="navbar navbar-expand navbar-light ">
            <div class="container-fluid">
                <a href="#" class="burger-btn d-block">
                    <i class="bi bi-justify fs-3"></i>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown me-1">
                            <a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i class='bi bi-envelope bi-sub fs-4 text-gray-600'></i>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 class="dropdown-header">Mail</h6>
                                </li>
                                <li><a class="dropdown-item" href="#">No new mail</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown dropdown-notifications me-3">
                            <a class="nav-link active dropdown-toggle" href="#" data-bs-toggle="dropdown"
                               aria-expanded="false">
                                <i data-count="0" class='bi bi-bell bi-sub fs-4 text-gray-600'></i>
                            </a>
                            <ul  id="message-form" class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <h6 class="dropdown-header">Notifications</h6>
                                </li>
                                <li><a class="dropdown-item">No notification available</a></li>
                                <li class="dropdown-item-content"></li>

                            </ul>
                            <script src="{{asset("https://js.pusher.com/5.0/pusher.min.js")}}"></script>
                            <script src="{{asset("//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js")}}"></script>
                            <script type="text/javascript">
                                const notificationsWrapper   = $('.dropdown-notifications');
                                const notificationsToggle    = notificationsWrapper.find('a[data-bs-toggle]');
                                const notificationsCountElem = notificationsToggle.find('i[data-count]');
                                let notificationsCount     = parseInt(notificationsCountElem.data('count'));
                                const notifications          = notificationsWrapper.find('li.dropdown-item-content');
                                Pusher.logToConsole = true;
                                const pusher = new Pusher('22c1e3e8a080c533ca41', {
                                    cluster: 'ap1',
                                    forceTLS: true
                                });
                                const channel = pusher.subscribe('my-channel');
                                channel.bind('my-event', function(data) {
                                    const existingNotifications = notifications.html();
                                    const avatar = Math.floor(Math.random() * (71 - 20 + 1)) + 20;
                                    const newNotificationHtml = `
                                         <li>
                                            <a class="dropdown-item">
                                                <div class="avatar me-3">
                                                    <img src="{{asset("assets/images/faces/1.jpg")}}" alt="" srcset="">
                                                    <span class="text-black-500" style="padding-left: 10px">`+data.message.body+`</span>
                                                </div>
                                            </a>
                                        </li>
                                    `;
                                    notifications.html(newNotificationHtml + existingNotifications);
                                    notificationsCount += 1;
                                    notificationsCountElem.attr('data-count', notificationsCount);
                                    notificationsWrapper.find('.notif-count').text(notificationsCount);
                                    notificationsWrapper.show();
                                });

                                // Echo.private('users.1')
                                //     .notification((notification) => {
                                //         console.log("notice", notification);
                                //         alert(JSON.stringify(notification));
                                //     });

                            </script>
                            <script src="{{ asset('js/app.js') }}"></script>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="user-menu d-flex">
                                <div class="user-name text-end me-3">
                                    <h6 class="mb-0 text-gray-600">{{Auth::user()->name}}</h6>
                                    <p class="mb-0 text-sm text-gray-600">Administrator</p>
                                </div>
                                <div class="user-img d-flex align-items-center">
                                    <div class="avatar avatar-md">
                                        <img src="{{asset("assets/images/faces/1.jpg")}}">
                                    </div>
                                </div>
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            <li>
                                <h6 class="dropdown-header">Hello, {{Auth::user()->name}} !</h6>
                            </li>
                            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-person me-2"></i> My
                                    Profile</a></li>
                            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-gear me-2"></i>
                                    Settings</a></li>
                            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-wallet me-2"></i>
                                    Wallet</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="{{url("admin/logout")}}"><i
                                        class="icon-mid bi bi-box-arrow-left me-2"></i> Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</div>
