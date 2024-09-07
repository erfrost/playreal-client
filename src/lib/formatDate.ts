const formatDate = (date: string) => {
  const lastOnlineDate: Date = new Date(date);
  const now: Date = new Date();

  const timeDiff: number = now.getTime() - lastOnlineDate.getTime();
  const oneDayInMs: number = 24 * 60 * 60 * 1000;

  if (timeDiff < oneDayInMs) {
    return "недавно";
  } else {
    const daysAgo: number = Math.floor(timeDiff / oneDayInMs);

    if ((daysAgo === 1 || daysAgo % 10 === 1) && daysAgo !== 11) {
      return `${daysAgo} день назад`;
    }
    if (daysAgo >= 2 && daysAgo <= 4) return `${daysAgo} дня назад`;
    if (daysAgo >= 5) return `${daysAgo} дней назад`;
  }
};

export default formatDate;
