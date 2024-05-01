import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos"; // Impor AOS dari pustaka AOS

function About() {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
      initClassName: false,
      animatedClassName: "animated",
    });
  }, []);

  return (
    <div className="mx-32 my-9">
      <div data-aos="fade-right" data-aos-duration="1500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro dolor est
        corrupti numquam cumque saepe illum quaerat rem obcaecati ex nulla eaque
        molestiae, id, neque perferendis quibusdam quia iure ullam deleniti
        asperiores tempora iusto odio reprehenderit. Debitis possimus modi
        eligendi perspiciatis nam adipisci iusto, sapiente corporis aliquam
        aspernatur cum rem incidunt, minus sequi, et illum dolore earum.
        Consequuntur quaerat aliquam, delectus molestiae accusantium rerum,
        dignissimos quis cumque facilis impedit deserunt veniam tempora ea
        ratione officiis, quam laborum fugit! Animi rem modi provident odit
        tempora vitae natus necessitatibus obcaecati impedit alias repellendus
        aliquam tenetur dignissimos inventore temporibus, rerum, iste harum
        deserunt.
      </div>
    </div>
  );
}

export default About;
