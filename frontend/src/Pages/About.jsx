import React,{useState,useEffect} from "react";
import { Box, Typography, Container, Grid } from "@mui/material";

function About() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming 768px is your mobile breakpoint
    };

    // Initial check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <Box sx={{  marginTop: isMobile ? '10%' : '4%', }}>
      <Box bgcolor="red" color="white" py={2} textAlign="center">
        <Typography variant="h4">Welcome to Sport Prince</Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box py={4}>
          {/* <Typography variant="h6" textAlign="center" gutterBottom>
            Our goal is to remove any technical or financial barriers that can
            prevent you from making your own website.
          </Typography> */}
          {/* <Typography variant="body1" textAlign="center">
            Our powerful tools empower individuals and business owners to create
            a website, sell online, or reach global audiences. Whether you're a
            beginner or website expert, we're excited to help you on your
            journey!
          </Typography> */}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="secondary.contrastText"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1">
                Hello sports freaks, it’s exciting to welcome you to the
                exciting realm of sports through our website. Are you tired of
                surfing the internet looking for exciting and reliable sports
                content? Then search no more. You’re about to navigate the
                exciting contents of Sportsprince.Com, a one stop destination
                for all sports information that is sure to lure your attention.
                Prepare to enter a virtual world where sports excitement and
                information are limitless. Sportsprince.Com will be your sports
                home for all the excitement and lessons that you require. This
                document takes you on a journey that intends not only to
                entertain but also to inform you on the game and excitement.
                Embracing the rich content of sportsprince.com, it may be
                concluded that this sports website is not only about sports and
                for sports enthusiasts – it is a community, an inspiration, and
                a celebration of variety in sports primarily cricket to give the
                best of the 22-yards game. Having provided its users with
                high-class content and many connections among sports fans across
                the globe, Sportsprince can be said to have proven a worthy
                platform in the domain of digital sports. The readers of
                sportsprince.com not only have an access to captivating stories
                of sports and cricketing world; but, they also gain inspiration
                from the journey of sportsprince and the outstanding website
                they have managed to create. In such a diverse and sometimes
                contradictory world, sportsprince is proof of the unique value
                of diversity and motivation through sport.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="white"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                What we do
              </Typography>
              <Typography variant="body1">
                Hello, and welcome to Sportsprince.Com—a site by sports
                enthusiasts for sports enthusiasts interested in sports. This
                site promises an array of cricket content sources that will
                drive one’s passion for their beloved sport. We look forward to
                being the ultimate source of sports information and the only bay
                you will require to whet ideas. Sportsprince.Com is a community
                Bound by Love for Sports! Connect with sports enthusiasts from
                around the world by joining our fun-loving community. Transmit
                your understanding, post or participate in lively dialogues, and
                share the sense of belonging with a community bound by the love
                of sports. Join us to encourage fair playing and sportsman
                spirit in the whole world. We’ll take you on a thought-provoking
                trip with Sportsprince.Com past the numbers and records to the
                genuine tales behind each game. You’ll experience being uplifted
                and revved up. We have carefully culled the contents of our
                website to be just as inspiring as the raw facts, with stories
                of sheer compassion, stamina, and enthusiasm loud in the numbers
                that are celebrated.
              </Typography>
              {/* Add your technology index content here */}
            </Box>
          </Grid>
        </Grid>

        {/* Add more grid items for other sections */}
        <Grid container spacing={4} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="secondary.contrastText"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                History
              </Typography>
              <Typography variant="body1">
                Sportsprince.Com was born out of a small apartment, a passion
                project. A shared dream by a group of people that wished to make
                the world a more connected place for sport. Their dream was to
                create a product that will bring fans of various sports from all
                over the world together. Sportsprince founders poured their
                heart sweat and blood creating Sportsprince. Like any startup,
                Sportsprince faced its own share of challenges and obstacles,
                but inspirational journey is the epitome of innovation and
                success. Sportsprince founders believed in the power of
                athletics. They wanted to give space where fans from varied
                backgrounds and beliefs, may come together and celebrate their
                love for the game. That ritual became the basis for
                Sportsprince. Sportsprince is a testament that one can do
                whatever they set their mind to if they have passion and
                dedication. From inception to how it is now, the product
                continues to spark hope and inspiration to people of all
                nationality worldwide. Indeed, Sportsprince the dream is valid
                with concrete action and belief.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="white"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Our Mission and Core Values
              </Typography>
              <Typography variant="body1">
                Sportsprince.Com is defined by a powerful mission statement:
                every day, we inspire, unite, and celebrate the global sports
                community. However, it is defined by more than a desire to
                deliver the news and updates that the target audience seeks. In
                pursuit of the shared goal, the main idea of the platform is
                developing a figure and community that celebrate both
                similarities and differences. As such, inclusion and diversity
                are the central values that we honor and uphold. In addition,
                the role of sport in teaching and cultivating such outstanding
                social values as teamwork, resilience, fairness, and
                perseverance is acknowledged. The central belief that we follow
                is that all values are equally essential, and embracing sports
                helps people understand and appreciate them. Our team shares
                these values, and every member is dedicated to creating an
                ambitious platform that equates sports with a force capable of
                making a difference in the social context. Being a team that
                embraces differences, both within the team and among our users,
                we hold that there is a place for everyone in Sportsprince.Com.
                Whether a professional athlete or a passionate fan, a man or a
                woman, you will find your place in the community. These values
                are not just a tribute to the current state of the site; rather,
                they are expected to shape the future, as Sportsprince. Com will
                earmark as a safe and positive space for everyone who is
                interested in sports. We heavily rely on our values, and we are
                incredibly proud to guide our audience towards inclusion and
                understanding. In close connection to the shared goal,
                Sportsprince.Com will contribute to building a safer, more
                diverse, and better-connected world. We at Sportsprince.Com
                intend to influence our readers through phenomenal stories of
                courage, hardship, and the indomitable human spirit demonstrated
                in the world of sports and motivate them to challenge their
                limits and doggedly chase their dreams. Every single post on
                Sportsprince.Com is designed to light a fire of motivation under
                each and every visitor to our platform. Whether it be an article
                about a seemingly unfavored team grabbing victory with
                relentless spirit or the story of a sports personality’s
                struggles with adverse conditions to reach the pinnacle of their
                career, we aim to demonstrate that with perseverance, tenacity,
                and the unshakable faith in oneself, nothing is impossible. So,
                are you ready to dive into these riveting stories guaranteed to
                not only entertain you but also inspire you to defeat your
                arch-nemesis and claim your own spot under the sun? After all,
                in this chaotic universe filled with distressing events and
                challenging circumstances battling and overcoming difficulties,
                Sportsprince.Com offers an assured glimpse of hope and
                positivity. Let’s get started on this journey through the
                dimensions of motivation and inspiration, confident that each
                one of us is destined to be truly great in our own unique ways.
              </Typography>
              {/* Add your technology index content here */}
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="secondary.contrastText"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Embracing Diversity in Sports
              </Typography>
              <Typography variant="body1">
                • The Beauty of Diversity: Diversity in sports enriches the
                fabric of competition, bringing together individuals from
                various backgrounds, cultures, and perspectives. It fosters a
                sense of unity and understanding, showcasing that talent knows
                no boundaries. At Sportsprince.Com, we celebrate inclusivity by
                featuring a wide range of sports from around the globe. Every
                athlete, regardless of their nationality or ethnicity, has a
                platform to shine and inspire others with their skills and
                passion for their sport. By embracing diversity in sports, we
                break down barriers and stereotypes. Our platform showcases
                athletes who defy societal norms, proving that excellence knows
                no bounds when it comes to dedication and hard work. We believe
                in empowering individuals to reach their full potential. • A
                Unified Community: Through embracing diversity in sports, we
                foster a sense of community among fans worldwide. Regardless of
                where they are from or what sport they follow, fans can come
                together to appreciate the beauty and excitement that sports
                bring into our lives. Together, we create a vibrant tapestry of
                unity through the universal language of sports. Within the
                digital realm of Sportsprince.Com lies a sanctuary for
                individuals seeking not only sports news and updates but also a
                source of inspiration and motivation. Here, we believe that
                sports transcend beyond mere physical activities; they possess
                the power to uplift spirits, ignite passions, and drive
                individuals towards greatness.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="white"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                The Growth Journey
              </Typography>
              <Typography variant="body1">
                Sportsprince.Com is the direct manifestation of the deep love
                for sports and a desire to unite under the banner of respect for
                human physical activity. The idea came to life during the night
                conversation between friends who were passionate about sport and
                could not find the place, where other followers could unite,
                share their experiences, and support each other. The founders
                started their way with enthusiasm and a solid set of ideas. From
                the very beginning, they believed that sport could motivate
                people, create a network of invisible connections between
                various communities, and unite representatives of all
                occupations and social layers. The team invested their hearts in
                creating a website that could unite people with the power of
                information and build a solid community of sports fans. The
                initial idea for this project gave rise to multitudes of
                brainstorms and consequent decisions. The team developed
                navigation, concept, design, created the mission and began to
                work on content. A group effort turned out to be invaluable, as
                each participant presented unique experience in the field of
                computers, graphic design, copywriting, and marketing, and drew
                their experience, knowledge, skills, and passion in the project.
                However, the results exceeded most optimistic expectations. What
                was created not just a website but a philosophy, that seemed to
                symbolize the power of cohesion, enormous effort, and
                indescribable joy of working on a global project. The way was a
                path to exciting and inspiring thoughts and activities, and the
                birth of the website that was seemingly completely new to this
                world could be compared to raising a flag on the summit that
                took years of climbing.
              </Typography>
              {/* Add your technology index content here */}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="secondary.contrastText"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Meet the Sportsprince Team
              </Typography>
              <Typography variant="body1">
                Our group is made up of individuals with a lifelong passion for
                sports, each with their set of abilities. Sports journalists and
                web developers devoted to making your visit enjoyable. . We as a
                group work as a well coordinated and tuned machine, with
                attempts built to allow you to keep out the best content and
                user experience. Collaboration is key among the group. The group
                collaborates and generates new and unique ideas. Every member of
                the Sportsprince team is dedicated to excellence in their field.
                An innate love of sports unites the minds behind Sportsprince.
                We don’t just generate and edit content; we produce responses,
                start chats, and develop a sense of connectedness to the sports
                world. The story of Sportsprince
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="white"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                The Passion for Sports
              </Typography>
              <Typography variant="body1">
                Sportsprince.Com is not just a site; it is a manifestation of
                our undeniable passion for sports. From the crack of a baseball
                bat to the swish of a basketball net, we are wholly consumed by
                the zeal sports bring to our lives. Every article we write,
                every video we make, carries this passion. It fuels us to
                bombard our readers with the most engaging, and informative
                content, it moves us to draw our readers into the community of
                sports and trends. This passion resonates not only while
                watching the games but also identifying with the athletes’
                discipline and teamwork. We believe that this feeling is what we
                aim to convey further to the readers, as it allows them to
                develop their passion that elevates them both on and off the
                field. Our central purpose is to spark a fire in each reader’s
                heart. The fire lights up the passion for sports and fosters the
                unstoppable drive to reach the goals beyond their capabilities.
                The Sportsprince.Com’s fiery passion model allows transforming
                every reader into a creator of their future, who is destined to
                succeed following their drive.
              </Typography>
              {/* Add your technology index content here */}
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: "40px" }}>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="secondary.contrastText"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                The Ultimate Sports Experience
              </Typography>
              <Typography variant="body1">
                The pursuit of ultimate sporting experience is the defining goal
                of Sportsprince.Com. Through meticulous match analysis,
                exclusive player interviews, and behind-the-scenes coverage, we
                strive to create a perfect and all-encompassing sports platform
                . However, what truly sets us apart are the ways in which we
                involve our audiences in every event we cover. • Engaging the
                Fans: The interactive qualities of our service are the prime
                concern of our team. For example, among the many ways users can
                interact with Sportsprince.Com content are live polling during
                the match, fantasy leagues, and fan forum inquiries. By
                integrating the sports events we feature into the personal
                experience of every user, we ensure that all fans of sports
                experience self-actualization through them . • Immersive
                Content: The most exciting and unique feature of the service is
                our cutting edge virtual reality content. Whether one is looking
                to catch a basketball game courtside or play with Barcelona at
                Camp Nou, Sportsprince.Com has the VR content to transport them.
                • Shared Human Experience: Although at Sportsprince.Com we
                believe that the pursuit of excellence is the highest human
                calling, we also hold that sports events should be the places
                where we share the sense of personal achievement. Thus, we
                report all the human stories of the victors, both the recognized
                heroes and the unsung ones.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              bgcolor="secondary.main"
              color="white"
              p={3}
              sx={{
                height: "400px",
                overflowY: "auto",
                scrollbarWidth: "none", // Firefox
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar for Chrome, Safari, Edge, etc.
                },
              }}
            >
              <Typography variant="h5" gutterBottom>
                Home of Inspiration & Motivation (Inviting Contents)
              </Typography>
              <Typography variant="body1">
                On the Sportsprince.com site, the world’s most ardent sports
                aficionados gather. Via real-time updates, fun information, and
                blogs and social media platforms, you, as a follower, will get
                connected with people who are as enthusiastic about sports as
                you are. Even if you are a soccer fanatic from Brazil, a
                basketball enthusiast from China, or a tennis fan from Spain,
                Sportsprince.com facilitates interaction across races. This
                international forum overcomes geographic distances and presents
                a way to establish strong ties between people who would never
                have met if not due to online communication. As you can
                communicate, share your personal opinion of the teams and
                players, you might approve of or show gratitude for new
                suggestions only available on the Sportsprince.com page.
                International communication about sports fosters a culturally
                diverse atmosphere throughout the network and tends to advertise
                mutual respect between people. Furthermore, the communication
                between sports aficionados does not end with simply holding
                chats and exchanging information regarding favorite players or
                teams. The international community encompasses fans from all
                around the world who will stand by each other during their
                victories and be supportive when the favorite teams lose, as
                mentioned in their statements on the Sportsprince.com site. The
                community allows togetherness between people who would never
                have an opportunity to meet in real life. The principle
                advantage of the community is that nothing is able to bring
                people closer than sports, regardless of the cultural,
                religious, and other distinctions.
              </Typography>
              {/* Add your technology index content here */}
            </Box>
          </Grid>
        </Grid>

        <Box py={4} textAlign="center">
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Typography variant="body1">
            Shahpur, Patna, Patna, Bihar, India, 800027
            <br />
            Phone: +91 7903938359
            <br />
            Email: support@thesportsprince.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default About;
