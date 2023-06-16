'use client';
import Image from 'next/image';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ScaleLoader } from 'react-spinners';

export default function BooksContainer() {
  const [hasMore, setHasMore] = useState(true);
  const [bookList, setBookList] = useState(
    Array(15).fill({
      title: 'Book',
      writer: 'Mahesh',
      cover_image:
        'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
      price: 30,
      tags: Array(3).fill({
        id: 1,
        tag: 'Tag',
      }),
    })
  );

  const fetchMoreData = () => {
    if (bookList.length >= 500) {
      setHasMore(false);
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setBookList((prev) =>
        prev.concat(
          Array(15).fill({
            title: 'Book',
            writer: 'Mahesh',
            cover_image:
              'https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg',
            price: 30,
            tags: Array(3).fill({
              id: 1,
              tag: 'Tag',
            }),
          })
        )
      );
    }, 500);
  };

  // useEffect(() => {
  //   setBookList((prev) =>
  //     prev.filter(
  //       (book) =>
  //         book.title.includes(search.current.value) ||
  //         book.writer.includes(search.current.value)
  //     )
  //   );
  // }, [search]);

  return (
    <>
      <section className='hidden sm:block'>
        <InfiniteScroll
          dataLength={bookList?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <ScaleLoader color='rgb(0, 255, 204)' className='text-center' />
          }>
          <div className='pb-4 text-black dark:text-white'>
            <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 place-items-center'>
              {bookList?.map((item: any, i: number) => (
                <div
                  key={i}
                  className='relative w-56 p-2 border border-gray-300 h-80 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
                  <div className='flex gap-2'>
                    <Image
                      className='w-36'
                      src={item?.cover_image}
                      height={164}
                      width={144}
                      alt=''
                    />
                    <div className='flex flex-col flex-1 gap-2'>
                      {item?.tags?.map((obj: any, j: number) => (
                        <span
                          key={j}
                          className='p-1 text-sm text-center text-black truncate bg-white border border-white cursor-pointer dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-white dark:hover:border-black'>
                          {obj.tag}-{j}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='flex flex-col pt-2'>
                    <h3 className='truncate'>
                      Title: {item?.title}-{i + 1}
                    </h3>
                    <p className='text-sm truncate'>Writer: {item?.writer}</p>
                  </div>
                  <button className='absolute p-2 text-sm text-black truncate bg-white border border-white cursor-pointer -right-2 -bottom-2 dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-white dark:hover:border-black'>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </section>
      <section className='sm:hidden'>
        <InfiniteScroll
          dataLength={bookList?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <ScaleLoader color='rgb(0, 255, 204)' className='text-center' />
          }>
          <div className='pb-4 text-black dark:text-white' id='related'>
            {bookList?.map((item, i) => (
              <div
                key={i}
                className='flex w-full h-40 gap-4 mb-4 border border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:bg-gray-200 lg:dark:bg-zinc-800/30'>
                <Image
                  className='w-24'
                  src={item?.cover_image}
                  height={120}
                  width={100}
                  alt=''
                />
                <div className='flex flex-col flex-1 gap-4 pr-4'>
                  <h3 className='truncate'>
                    Title: {item?.title}-{i + 1}
                  </h3>
                  <p className='text-sm truncate'>Writer: {item?.writer}</p>
                  <div className='flex gap-2'>
                    {item?.tags?.map((obj: any, j: number) => (
                      <span
                        key={j}
                        className='p-1 text-sm text-center text-black truncate bg-white border border-white cursor-pointer dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-white dark:hover:border-black'>
                        {obj.tag}-{j}
                      </span>
                    ))}
                  </div>
                  <button className='p-1 text-sm text-black truncate bg-white border border-white cursor-pointer -right-2 -bottom-2 dark:text-white dark:bg-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black hover:border-white dark:hover:border-black'>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
}
