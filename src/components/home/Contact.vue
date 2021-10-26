<template>
  <div class="contact">
    <div class="title">
      <h2>conatct us</h2>
    </div>
    <div class="info">
      <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61181.1235333215!2d107.48695776232779!3d16.58555457219997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314108fc6c626df1%3A0x4df6e8a8ea182fbc!2zUXXhuqNuZyBQaMaw4bubYywgUXXhuqNuZyDEkGnhu4FuIERpc3RyaWN0LCBUaHVhIFRoaWVuIEh1ZSwgVmlldG5hbQ!5e0!3m2!1sen!2s!4v1633676086134!5m2!1sen!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div class="contact-email">
        <div class="email">
          <h3>Give your email to recieve sale news</h3>
          <label for="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email">
          <label for="note">Note</label>
          <textarea id="note" name="note" cols="30" rows="10" placeholder="note"></textarea>
          <button class="btn">Submit</button>
        </div>

        <!-- link chat -->
        <div class="chat">
          <div class="zalo link-chat">
            <a href="https://zalo.me/0965527297" target="_blank">
              <img src="https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png" alt="zalo">
            </a>
          </div>
          <div class="messenger link-chat">
            <a href="https://m.me/binh.dangphuoc1" target="_blank">
              <img src="https://www.apkmirror.com/wp-content/uploads/2020/07/53/5f131216a522e.png" alt="mess">
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'contact'
}
</script>

<style>
.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
}
.contact .title {
  height: 5rem;
  margin-top: 2rem;
}
.contact .title h2 {
  font-size: 3rem;
  color: red;
  text-transform: uppercase;
}
.contact .info {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
}
.contact .info > div {
  width: 45%;
  height: 35rem;
}
.contact .info .map >* {
  width: 100%;
  height: 100%;
}
.contact .info .contact-email .email {
  width: 100%;
  height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.contact .info .contact-email .email h3 {
  height: 5rem;
  font-size: 2rem;
  color: black;
}
.contact .info .contact-email .email input {
  height: 4rem;
  width: 100%;
  border: 1px solid black;
  font-size: 1.3rem;
}
.contact .info .contact-email .email textarea {
  height: 13rem;
  width: 100%;
  border: 1px solid black;
  font-size: 1.3rem;
}
.contact .info .contact-email .email button {
  height: 3rem;
  width: 10rem;
  margin: 1rem auto;
  color: red;
  background: green;
  font-size: 2rem;
  cursor: pointer;
}
.contact .info .contact-email .email label {
  align-self: flex-start;
}

.contact .chat {
  height: 5rem;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
/* .contact .chat >div {
  height: 2rem;
  width: 12rem;
} */
.contact .chat .link-chat {
  width: 4rem;
  height: 4rem;
}
.contact .chat .link-chat img {
  height: 4rem;
  width: 4rem;
}

@media (max-width: 550px) {
  .contact .info {
    flex-direction: column;
  }
  .contact .info > div {
    width: 90%;
    height: 35rem;
  }
}
</style>