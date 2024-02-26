import React from "react"
import "./style.css"
import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

const carousel: KeenSliderPlugin = (slider) => {
    const z = 300
    function rotate() {
        const deg = 360 * slider.track.details.progress
        slider.container.style.transform = `translateZ(-${z}px) rotateY(${-deg}deg)`
    }
    slider.on("created", () => {
        const deg = 360 / slider.slides.length
        slider.slides.forEach((element, idx) => {
            element.style.transform = `rotateY(${deg * idx}deg) translateZ(${z}px)`
        })
        rotate()
    })
    slider.on("detailsChanged", rotate)
}

export default function Events() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            selector: ".carousel__cell",
            renderMode: "custom",
            mode: "free-snap",
        },
        [carousel]
    )

    return (
        <div className="wrapper">
            <div className="scene">
                <a>
                    Best Events property
                </a>
                <div className="carousel keen-slider" ref={sliderRef}>
                    <div className="carousel__cell number-slide1">
                        <img src={"/home/city.jpeg"} />
                    </div>
                    <div className="carousel__cell number-slide2">2</div>
                    <div className="carousel__cell number-slide3">3</div>
                    <div className="carousel__cell number-slide4">4</div>
                    <div className="carousel__cell number-slide5">5</div>
                    <div className="carousel__cell number-slide6">6</div>
                </div>
            </div>
        </div>
    )
}
