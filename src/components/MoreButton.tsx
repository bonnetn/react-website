import React from "react";
import "./MoreButton.scss";

type Props = {
  fetchingMore: boolean;
  moreResults: (() => Promise<void>) | undefined;
};

const buttonText = (fetchingMore: boolean) => {
  if (fetchingMore) {
    return "Fetching...";
  } else {
    return "More results";
  }
};

function MoreButton({ fetchingMore, moreResults }: Props) {
  return (
    <div className={"more-results-banner"}>
      <button
        onClick={moreResults ?? (async () => {})}
        hidden={moreResults === undefined}
        disabled={fetchingMore}
      >
        {" "}
        {buttonText(fetchingMore)}
      </button>
    </div>
  );
}

export default MoreButton;
