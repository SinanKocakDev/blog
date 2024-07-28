
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import trLocale from 'date-fns/locale/tr';

function TimeAgo({ createdAt }) {
  const formattedDate = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    locale: trLocale
  });

  return <span>{formattedDate}</span>;
}

export default TimeAgo;
