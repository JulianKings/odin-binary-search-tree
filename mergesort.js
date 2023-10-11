const mergeSort = (arr) => {
    if(arr.length < 2)
    {
        return arr;
    }

    let halfLength = 0;
    if((arr.length % 2) === 0)
    {
        halfLength = arr.length / 2;
    } else {
        halfLength = Math.floor(arr.length/2) + 1;
    }

    // sort first half
    const firstSort = mergeSort(arr.slice(0, halfLength));
    const secondSort = mergeSort(arr.slice(halfLength, arr.length));

    return merge(firstSort, secondSort);

}

const merge = (firstArr, secondArr, finalArr = []) =>
{
    if(firstArr.length === 0 && secondArr.length === 0)
    {
        return finalArr;
    }

    if(firstArr.length === 0)
    {
        finalArr.push(secondArr.shift());
        return merge(firstArr, secondArr, finalArr);
    }

    if (secondArr.length === 0)
    {
        finalArr.push(firstArr.shift());
        return merge(firstArr, secondArr, finalArr);
    }

    if(firstArr[0] <= secondArr[0])
    {
        finalArr.push(firstArr.shift());
        return merge(firstArr, secondArr, finalArr);
    }

    finalArr.push(secondArr.shift());
    return merge(firstArr, secondArr, finalArr);

}