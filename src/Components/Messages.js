import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const messages = [
  { id: 1, sender: 'John Doe', message: 'Hey, how are you doing?' },
  { id: 2, sender: 'Jane Smith', message: 'I am good, thanks for asking.' },
  { id: 3, sender: 'Bob Williams', message: 'What are you up to?' },
  { id: 4, sender: 'Alice Johnson', message: 'Not much, just relaxing at home.' },
];

const MessageList = () => {
  return (
    <>
    <div class="message-list">
    <h2 style={{textAlign:'center'}}>Messages</h2>
  <div class="message">
    <div class="message-header">
      <span class="message-user">John</span>
      <span class="message-time">10:15 AM</span>
    </div>
    <div class="message-body">
      Hi there, how are you doing today?
    </div>
  </div>
  <div class="message">
    <div class="message-header">
      <span class="message-user">Sarah</span>
      <span class="message-time">10:18 AM</span>
    </div>
    <div class="message-body">
      Hey, I just wanted to follow up on our meeting tomorrow.
    </div>
  </div>
  <div class="message">
    <div class="message-header">
      <span class="message-user">Michael</span>
      <span class="message-time">10:25 AM</span>
    </div>
    <div class="message-body">
      Hi there, I wanted to get your thoughts on the new project proposal.
    </div>
  </div>
  <div class="message">
    <div class="message-header">
      <span class="message-user">Amy</span>
      <span class="message-time">10:30 AM</span>
    </div>
    <div class="message-body">
      Just wanted to say hi and see how you're doing.
    </div>
  </div>
  <div class="message">
    <div class="message-header">
      <span class="message-user">David</span>
      <span class="message-time">10:35 AM</span>
    </div>
    <div class="message-body">
      Hey, I had a question about the report you sent me last week.
    </div>
  </div>
  <div class="message">
    <div class="message-header">
      <span class="message-user">Olivia</span>
      <span class="message-time">10:40 AM</span>
    </div>
    <div class="message-body">
      Good morning! How was your weekend?
    </div>
  </div>
</div>
</>
  );
};

export default MessageList;
