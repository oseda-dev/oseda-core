import GlassPanel from "../GlassPanel/GlassPanel";
import "./Paginator.css";

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
    <div className="paginator">
      <GlassPanel
        className={`page-arrow${disablePrev ? " page-arrow-disabled" : ""}`}
        as="button"
        onClick={onPrev}
        disabled={disablePrev}
      >
        {/* up chrevron */}
        ▲
      </GlassPanel>

      <GlassPanel className="page-number" as="div">
        {curPage + 1}
      </GlassPanel>

      <GlassPanel
        className={`page-arrow${disableNext ? " page-arrow-disabled" : ""}`}
        as="button"
        onClick={onNext}
        disabled={disableNext}
        >
          {/* down chrevron */}
        ▼
      </GlassPanel>
    </div>
  );
};

export default Pagination;