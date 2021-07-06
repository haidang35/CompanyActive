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


{{--                 --------------LINH--------------}}
                <li class="sidebar-item ">
                    <a href="{{url("/admin/customers")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Customers</span>
                    </a>
                </li>
                <li class="sidebar-item" id="maskasread" onclick="maskAsNotificationRead()">
                    <a href="{{url("/admin/manage-noti")}}" class='sidebar-link'>
                        <i class="bi bi-grid-1x2-fill"></i>
                        <span>Notification</span>
                        <span class="badge" style="width:30px;height:30px;border-radius: 20px;background-color:grey">{{count(auth()->user()->unreadNotifications)}}</span>
                    </a>
                    <script src="{{asset("/js/main.js")}}"></script>

                </li>
            </ul>
        </div>
        <button class="sidebar-toggler btn x"><i data-feather="x"></i></button>
    </div>
</div>
