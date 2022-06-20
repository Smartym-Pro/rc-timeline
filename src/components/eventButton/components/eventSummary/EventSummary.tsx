interface EventSummaryProps {
  summary?: string;
}

const EventSummary = (props: EventSummaryProps) => {
  const { summary } = props;

  return <p className="Kalend__text Kalend__Event__summary Kalend__text-light" dangerouslySetInnerHTML={{ __html: summary || '' }}></p>;
};

export default EventSummary;
