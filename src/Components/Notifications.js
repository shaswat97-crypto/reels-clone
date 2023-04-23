import React from "react";

function Notifications() {
  return (
    <>
     
    <ul class="notifications-list">
      <li><h2 style={{textAlign:'center'}}>Notifications</h2></li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/300" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">John Doe</span>
          <span class="notification-text">liked your post</span>
          <span class="notification-time">5 min ago</span>
        </div>
      </li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/301" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">Jane Smith</span>
          <span class="notification-text">mentioned you in a comment</span>
          <span class="notification-time">10 min ago</span>
        </div>
      </li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/302" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">Mike Johnson</span>
          <span class="notification-text">sent you a friend request</span>
          <span class="notification-time">15 min ago</span>
        </div>
      </li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/303" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">Emily Brown</span>
          <span class="notification-text">commented on your post</span>
          <span class="notification-time">20 min ago</span>
        </div>
      </li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/304" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">David Lee</span>
          <span class="notification-text">liked your comment</span>
          <span class="notification-time">25 min ago</span>
        </div>
      </li>
      <li>
        <div class="notification-avatar">
          <img src="https://picsum.photos/200/305" alt="Avatar" />
        </div>
        <div class="notification-info">
          <span class="notification-username">Sarah Lee</span>
          <span class="notification-text">sent you a message</span>
          <span class="notification-time">30 min ago</span>
        </div>
      </li>
    </ul>
    </>
  );
}

export default Notifications;
