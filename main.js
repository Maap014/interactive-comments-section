const commentSection = document.getElementById("comments-section");
const repliesSection = document.getElementById("replies-section");
const commentBox = document.getElementById("comment-form");
const replybtn = document.querySelector(".reply-box");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    let outPut = "";
    let outPutReply = "";
    for (let items of data.comments) {
      outPut += `
      <div class="user-comment-box" id="${items.id}">
          <div class="user-info">
            <img src="${items.user.image.png}" alt="Profile Picture" class="profile-picture" />
            <span class="user-name">${items.user.username}</span>
            <span class="created-at">${items.createdAt}</span>
          </div>
          <div class="content-cotainer">
            <p class="content">${items.content}
            </p>
          </div>
          <div class="comment-footer">
            <div class="user-score">
              <button class="add">+</button>
              <span class="score">${items.score}</span>
              <button class="subtract">-</button>
            </div>
            <button class="reply-box">
              <img src="" alt="Reply icon" />
              <p class="reply-user">Reply</p>
            </button>
          </div>
        </div>
      `;
      commentSection.innerHTML = outPut;

      for (let reply of items.replies) {
        outPutReply += `
    <div class="user-comment-box" id="${reply.id}">
        <div class="user-info">
          <img src="${reply.user.image.png}" alt="Profile Picture" class="profile-picture" />
          <span class="user-name">${reply.user.username}</span>
          <span class="created-at">${reply.createdAt}</span>
        </div>
        <div class="content-cotainer">
          <p class="content"><a href="#">@${reply.replyingTo}</a> ${reply.content}
          </p>
        </div>
        <div class="comment-footer">
          <div class="user-score">
            <button class="add">+</button>
            <span class="score">${reply.score}</span>
            <button class="subtract">-</button>
          </div>
          <button class="reply-box">
            <img src="" alt="Reply icon" />
            <p class="reply-user">Reply</p>
          </button>
        </div>
      </div>
    `;
        repliesSection.innerHTML = outPutReply;
      }
    }
    commentBox.innerHTML = `
    <label for="comment-box">Comment:</label>
    <textarea
      cols="30"
      rows="10"
      type="text"
      placeholder="Add a comment..."
      id="comment-box"
      name="comment"
      title=""
      required
    ></textarea>
    <div class="send-comment-box">
      <img src="${data.currentUser.image.png}" alt="Profile Picture" class="profile-picture" />

      <button type="submit" class="send-comment">Send</button>
    </div>
    `;
  })
  .catch((error) => console.error(error));

const renderReplybox = () => {
  return commentBox.innerHTML;
};

replybtn.addEventListener("click", () => {
  renderReplybox();
});
