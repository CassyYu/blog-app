import { Comment, List, Form, Input, Button, Message } from '@arco-design/web-react';
import { useContext, useEffect, useState } from 'react';
import { getCommentsByPostId, postComment } from '../../api/servers';
import { CommentType } from '../../api/types';
import { UserContext } from '../../App';
import CommentItem from './commentItem';

export default function Guestbook() {

  const [comments, setComments] = useState<CommentType[]>([]);
  const [replyId, setReplyId] = useState<number>();

  const { uname } = useContext(UserContext);

  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const pathname = window.location.pathname;
      const post_id = parseInt(pathname.replace('/post/', ''));
      const res = await getCommentsByPostId(post_id);
      setComments(res.data);
    })()
  }, [])

  return (
    <div>
      <List bordered={true} header={<div>评论区</div>} className='bg-gray-50 mt-4'>
        {comments.length ? comments.map(comment =>
          <List.Item key={comment.id} className={replyId === comment.id ? 'bg-red-50' : ''}>
            <CommentItem comment={comment} level={1} replyId={replyId} setReplyId={setReplyId} />
            {comment.reply ?
              <List bordered={true} className='bg-gray-50 mt-4'>
                {comment.replies.map(reply =>
                  <List.Item key={reply.id}>
                    <CommentItem comment={reply} level={2} replyId={replyId} setReplyId={setReplyId} />
                  </List.Item>
                )}
              </List>
              : <></>}
          </List.Item>
        ) : <></>}
      </List>
      <Form form={form}>
        {uname.length ?
          <Comment
            align='right'
            actions={[
              <Button key='0' type='secondary'
                onClick={() => form.resetFields()}
              >Cancel</Button>,
              <Button key='1' type='primary'
                onClick={async () => {
                  const pathname = window.location.pathname;
                  const post_id = parseInt(pathname.replace('/post/', ''));
                  const res = await postComment(post_id, replyId, form.getFieldValue('content'));
                  form.resetFields()
                  if (res.code === 0) Message.success(res.message);
                  else Message.warning(res.message);
                  const res1 = await getCommentsByPostId(post_id);
                  setComments(res1.data);
                  setReplyId(undefined)
                }}
              >Reply</Button>,
            ]}
            content={<div>
              <Form.Item field='content' wrapperCol={{ span: 24 }}>
                <Input.TextArea placeholder='Here is your content.' />
              </Form.Item>
            </div>}
          >
          </Comment> :
          <Comment
            align='right'
            actions={[
              <Button key='0' type='secondary' disabled>Cancel</Button>,
              <Button key='1' type='primary' disabled>Reply</Button>,
            ]}
            content={<div>
              <Input.TextArea disabled placeholder='登录后可即发表评论' />
            </div>}
          >
          </Comment>
        }
      </Form>
    </div >
  )
}