import React, { useEffect } from "react";
import "../../../css/banner.css";

const ProductBanner = () => {
  useEffect(() => {
    const accordionItems = document.querySelectorAll("#accordion > li");

    accordionItems.forEach((item) => {
      if (window.innerWidth > 767) {
        item?.addEventListener("mouseenter", handleAccordion);
      } else {
        item?.addEventListener("touchstart", handleAccordion);
      }
    });

    return () => {
      accordionItems.forEach((item) => {
        item.removeEventListener("mouseenter", handleAccordion);
      });
    };
  }, []);

  const handleAccordion = (e: Event): void => {
    e.stopPropagation();
    const item = e.currentTarget as HTMLElement;

    if (item.classList.contains("out")) {
      item.classList.add("out");
    } else {
      item.classList.add("out");
      Array.from(item.parentNode!.children).forEach((sibling) => {
        if (sibling !== item) {
          sibling.classList.remove("out");
        }
      });
    }
  };

  return (
    <div data-aos="zoom-in">
      <div className="site-inner">
        <section className="container-fluid">
          <div className="row">
            <ul className="accordion-group" id="accordion">
              <li
                style={{
                  backgroundImage: `url(
                    "https://5.imimg.com/data5/SELLER/Default/2021/9/OW/NW/XF/17251528/office-interior-designing-service.jpg"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Office</h3>
                <section className="hidden-xs">
                  <article>
                    <p>Rual and rustic</p>
                  </article>
                </section>
              </li>
              <li
                className="out"
                style={{
                  backgroundImage: `url(
                    "https://images.homify.com/c_fill,f_auto,h_500,q_auto,w_1280/v1469803988/p/photo/image/1603932/1.jpg"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>House</h3>
                <section className="hidden-xs">
                  <article>
                    <p>Family house</p>
                  </article>
                </section>
              </li>
              <li
                style={{
                  backgroundImage: `url(
                    "https://media.architecturaldigest.com/photos/55e77da3cd709ad62e8f6999/master/w_320%2Cc_limit/dam-images-homes-2002-11-pavlik-hosl02_pavlik.jpg"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Villa</h3>
                <section className="hidden-xs">
                  <article>
                    <p>For single couple</p>
                  </article>
                </section>
              </li>
              <li
                style={{
                  backgroundImage: `url(
                    "https://gruppoconcorde-cdn.thron.com/delivery/public/image/gruppoconcorde/f8cb0b39-18b6-4ea7-8ab4-8b6ec214bfaf/sccw3m/std/1200x800/AtlasConcorde_Residenza%20Hyosung_Corea_006.jpg?scalemode=auto&format=WEBP"
                  )`,
                }}
              >
                <div className="accordion-overlay"></div>
                <h3>Apartment</h3>
                <section className="hidden-xs">
                  <article>
                    <p>Luxury Apartment</p>
                  </article>
                </section>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductBanner;
