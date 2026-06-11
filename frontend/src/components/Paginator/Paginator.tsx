import GlassPanel from "../GlassPanel/GlassPanel";

type PaginationProps = {
    curPage: number;
    onPrev: () => void;
    onNext: () => void;
    disablePrev?: boolean;
    disableNext?: boolean;
};

const Pagination = ({
    curPage,
    onPrev,
    onNext,
    disablePrev = false,
    disableNext = false,
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

            {!disableNext && (
                <GlassPanel
                    className="page-button"
                    as="button"
                    onClick={onNext}
                    >
                    Next
                </GlassPanel>
            )}
        </span>
    );
};

export default Pagination;
