import Comment from '../comment/comment';

type PropsType = {
  comments: [number];
};

function Comments({comments}: PropsType): JSX.Element {
  // const newsItem = useAppSelector(getCurrentNews);
  // const isLoading = useAppSelector(getCurrentNewsLoading);
  // const dispatch = useAppDispatch();
  // const { id } = useParams<{ id: string }>();


  // useEffect(() => {
  //   if (newsItem === null || newsItem.id !== Number(id)) {
  //     dispatch(fetchCurrentNews(Number(id)));
  //   }
  // }, [id]);

  // if (!newsItem || isLoading) {
  //   return (
  //     <h2>Loading...</h2>
  //   );
  // }

  return (
    <ul>
      <button onClick={() => {}}>Update</button>
      {comments && comments.map((comment) => (
        <li key={comment}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );

}

export default Comments;