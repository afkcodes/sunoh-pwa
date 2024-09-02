import React, { useState } from 'react';
import { LuHistory, LuX } from 'react-icons/lu';
import Button from './Button/Button';
import Header from './Header/Header';
import TextLink from './TextLink/TextLink';

interface RecentlySearchedKeywordsProps {
  initialKeywords?: string[];
  onKeywordClick?: (keyword: string) => void;
}

const RecentlySearchedKeywords: React.FC<RecentlySearchedKeywordsProps> = ({
  initialKeywords = [],
  onKeywordClick,
}) => {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords);

  const handleKeywordClick = (keyword: string) => {
    if (onKeywordClick) {
      onKeywordClick(keyword);
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter((keyword) => keyword !== keywordToRemove));
  };

  return (
    <div className='rounded-lg bg-background'>
      <Header
        textLinkConfig={{
          children: ' Recently Searched',
          size: 'lg',
          weight: 'semibold',
        }}
      />
      <div className='flex flex-col gap-2 px-2'>
        {keywords.map((keyword, index) => (
          <div
            className='flex items-center justify-between w-full py-3 m-0'
            key={keyword}>
            <Button
              onClick={handleKeywordClick}
              size='none'
              variant='unstyled'
              radius='sm'
              classNames='p-0 space-x-2 m-0'
              key={index}>
              <LuHistory size={20} className='text-text-secondary' />
              <TextLink size='sm' weight='medium'>
                {keyword}
              </TextLink>
            </Button>
            <Button
              variant='unstyled'
              classNames='p-0 pr-2 m-0 text-text-secondary'
              onClick={() => handleRemoveKeyword(keyword)}>
              <LuX size={20} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlySearchedKeywords;
