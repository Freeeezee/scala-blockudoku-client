import GridContent from "./GridContent";
import PreviewGrid from "./PreviewGrid";

export default function () {
    return (
        <div className="flex-column gap-5 d-flex">
            <div className="content position-relative">
                <div id="grid-container" className="container">
                    <GridContent/>
                </div>
                <div className="position-absolute start-0 top-0 w-100 h-100">
                    <div id="preview-grid-container" className="container">
                        <PreviewGrid/>
                    </div>
                </div>
            </div>
        </div>
    )
}