import GlassPanel from "../GlassPanel/GlassPanel";

type PaginationProps = {
    curPage: number;
    onPrev: () => void;
    onNext: () => void;
    disablePrev?: boolean;
};

const Pagination = ({
    curPage,
    onPrev,
    onNext,
    disablePrev = false,
}: PaginationProps) => {
    return (
        <span className="page-buttons-container">
            {!disablePrev && (
                <GlassPanel
                    className="page-button"
                    as="button"
                    onClick={onPrev}
                >
                    Prev
                </GlassPanel>
            )}

            <GlassPanel className="page-button" as="button">
                {curPage}
            </GlassPanel>

            {/* should probably conditionally render on last page, but would need the backend to track that */}
            <GlassPanel
                className="page-button"
                as="button"
                onClick={onNext}
            >
                Next
            </GlassPanel>
        </span>
    );
};

export default Pagination;
