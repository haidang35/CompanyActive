<div id="sidebar" class="active">
    <div class="sidebar-wrapper active">
        <div class="sidebar-header">
            <div class="d-flex justify-content-between">
                <div class="logo">
                    <a href="index.html"><img src="{{asset("assets/images/logo/logo.png")}}" alt="Logo" srcset=""></a>
                </div>
                <div class="toggler">
                    <a href="#" class="sidebar-hide d-xl-none d-block"><i class="bi bi-x bi-middle"></i></a>
                </div>
            </div>
        </div>
        <div class="sidebar-menu">
            <ul class="menu">
                <li class="sidebar-title">Menu</li>

                <li class="sidebar-item active ">
                    <a href="{{url("/admin")}}" class='sidebar-link'>
                        <i class="bi bi-grid-fill"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

                <li class="sidebar-item ">
                    <a href="{{url("/admin/manage-departments")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Departments</span>
                    </a>
                </li>

                <li class="sidebar-item ">
                    <a href="{{url("/admin/manage-staffs")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Staffs</span>
                    </a>
                </li>
                <li class="sidebar-item ">
                    <a href="{{url("/admin/documents")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Documents</span>
                    </a>
                </li>
                <li class="sidebar-item  has-sub">
                    <a href="#" class='sidebar-link'>
                        <i class="bi bi-hexagon-fill"></i>
                        <span>Posts</span>
                    </a>
                    <ul class="submenu ">
                        <li class="submenu-item ">
                            <a href="{{url("/admin/manage-posts")}}">Posts</a>
                        </li>
                        <li class="submenu-item ">
                            <a href="{{url("/admin/posts/editor")}}">Create post</a>
                        </li>
                    </ul>
                </li>







{{--                 --------------LINH--------------}}
                <li class="sidebar-item ">
                    <a href="{{url("/admin/customers")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Customers</span>
                    </a>
                </li>
                <li class="sidebar-item" id="marknoti" onclick="markAsNotificationRead()">
                    <a href="{{url("/admin/manage-noti")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Notification</span>
                        <span class="badge" style="width:30px;height:30px;border-radius: 20px;background-color:grey">{{count(auth()->user()->unreadNotifications)}}</span>
                    </a>

                    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
                    <script src="{{asset('/js/main.js')}}"></script>
                </li>
            </ul>
        </div>
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
    </div>
</div>
