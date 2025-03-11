document.addEventListener("DOMContentLoaded", function () {
    const emojiList = ["😀", "😂", "😍", "🤖", "👻", "🎃", "🔥", "💣", "💎", "👽"];
    const numEmojis = 20; // Number of falling emojis
    const links = [
        "https://www.nhathuocankhang.com/ban-tin-suc-khoe/15-thoi-quen-tot-cho-suc-khoe-moi-ngay-khong-the-bo-qua-1469128",
        "https://tuoitre.vn/co-gi-o-mang-den-thien-duong-hong-ma-ca-ngan-du-khach-ve-tham-20231231183607197.htm",
        "https://thegioilamvuon.com/chau-nhua-trong-cay/?srsltid=AfmBOopeDxgKPe1sqAvpPcJPGXg8hMlL_g9H8rOcFFul_AMRDFX7ykW9",
        "https://tinder.com/",
        "https://bet888vn.net/vn?utm_source=seo&utm_medium=auto&utm_campaign=giz-ads-1",
        "https://nhipcaudautu.vn/phong-cach-song/di-tim-gia-tri-cho-cong-dong-lgbt-3357185/",
        "https://www.penguin.co.uk/series/EVLC/everymans-library-classics",
        "https://genius.com/Lola-young-messy-lyrics",
        "https://www.crescentmall.com.vn/tenants/ovs",
        "https://archive.org/details/the-pillow-book/page/n4/mode/1up",
    ];

    // Function to create a random emoji
    function createEmoji() {
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = emojiList[Math.floor(Math.random() * emojiList.length)];

        // Random position and animation speed
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.top = "-5vh"; // Start slightly above the screen
        emoji.style.animationDuration = (Math.random() * 3 + 3) + "s"; // Fall duration: 3-6s

        // Click event on emoji
        emoji.addEventListener("click", function () {
            if (Math.random() < 0.8) {
                // 80% chance to open a random link
                window.open(links[Math.floor(Math.random() * links.length)], "_blank");
            } else {
                // 20% chance to disappear
                emoji.style.display = "none";
            }
        });

        document.body.appendChild(emoji);

        // Remove emoji from DOM after falling
        setTimeout(() => {
            emoji.remove();
        }, 6000);
    }

    // Generate initial emojis
    for (let i = 0; i < numEmojis; i++) {
        createEmoji();
    }

    // Generate new emojis every second
    setInterval(createEmoji, 1000);
});
