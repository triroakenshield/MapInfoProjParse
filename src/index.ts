import { CoordinateReferenceSystemDescription } from "./CoordinateReferenceSystemDescriptions";

window.onload = () => {
    const button =  document.getElementById("mibutton");
    button?.addEventListener("click", getTrainingName);
    
    function getTrainingName(this: HTMLElement) {
        let mitext =<HTMLTextAreaElement> document.getElementById("mitext");
        const text = mitext.value;
        let proj4text = document.getElementById("proj4text");
    
        var cs = CoordinateReferenceSystemDescription.parse(text);

        var proj_str = cs.toProj();
        proj4text.textContent = proj_str ;
    }
};