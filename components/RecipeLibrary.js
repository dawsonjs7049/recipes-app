import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import RecipeComp from 'components/recipe';

export default function RecipeLibrary({ recipes }) {

    const [currentItems, setCurrentItems] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 3;

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        
        setCurrentItems(recipes.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(recipes.length / itemsPerPage));

    }, [itemOffset, itemsPerPage, recipes]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % recipes.length;
        
        setItemOffset(newOffset);
    };

    return (
        <>
            <div className="w-full flex flex-row justify-evenly gap-4 flex-wrap mb-20">
                {
                    currentItems.map(recipe => {
                        return (
                            <RecipeComp recipe={recipe} key={recipe.id} />
                        )
                    })
                }
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                pageLinkClassName="page-num"
                previousLinkClassName="page-num"
                nextLinkClassName="page-num"
                activeLinkClassName="active"
            />
        </>
    );
}
