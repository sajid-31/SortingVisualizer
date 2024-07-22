async function selection() {
    const elements = document.querySelectorAll('.bar');
    for(let i=0;i<elements.length;i++){
        if(stopSorting) return;
        if(isPaused) await waitWhilePaused();
        console.log(`in ${i}th loop`);
        let min_index = i;
        elements[i].style.background= 'blue';
        for(let j=i+1; j<elements.length;j++){
            if(isPaused) await waitWhilePaused();
            elements[j].style.background='red';
            await waitforme(delay);
            if(parseInt(elements[j].style.height)<parseInt(elements[min_index].style.height)){
                if(min_index!=i){
                    elements[min_index].style.background='cyan';
                }
                min_index = j;
            } else{
                elements[j].style.background='cyan';
            }
        }
        await waitforme(delay);
        swap(elements[min_index],elements[i]);
        elements[min_index].style.background='cyan';
        elements[i].style.background='green';
    }
}

const selectionSortBtn = document.querySelector('.selectionSort');
selectionSortBtn.addEventListener('click', async function(){
    isSorting=true;
    isPaused=false;
    stopSorting=false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    await selection();
    enableSortingBtn();
    enableSizeSlider();
    enableNewArrayBtn();
    stopSorting=false;
    isSorting=false;
})