import { BASE_URL } from "../constants"

type AnimationsType ={
    [key: number]: number
}

const animations:AnimationsType = {}

export const startCar = async (id: number) => {
    return (
      await fetch(`${BASE_URL}/engine?id=${id}&status=started`, {
        method: "PATCH",
      })
    ).json();
  };
  
  export const stopCar = async (id: number) => {
    fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, {
      method: "PATCH",
    }).then((res) => {
        const car = <HTMLDivElement>document.getElementById(`car-${id}`);
        window.cancelAnimationFrame(animations[id]);
        car.style.transform = "translateX(0)";
    }).catch((e) => console.error("Error stopping car:", e));
  };
  
  
  
  export const startDrive = async (id: number) => {
    const res = await fetch(
      `${BASE_URL}/engine?id=${id}&status=drive`,
      {
        method: "PATCH",
        
      },
    );
    const data = await res.json();
    return data;
  };
  
  export const startCarAndDrive = (id: number) => {
    startCar(id).then((res) => {
      const { velocity, distance } = res;
      const car = <HTMLDivElement>document.getElementById(`car-${id}`);
      const animationId = startAnimation(id, velocity, distance, car);
      animations[id] = animationId;
      console.log("Animation started for car:", id, "Animation ID:", animationId);
      startDrive(id).then((res) => {
        if (!res.success) {
          window.cancelAnimationFrame(animationId);
        }
      });
    });
  };
  
  function startAnimation(
    id: number,
    velocity: number,
    distance: number,
    car: HTMLDivElement,
  ) {
    let start: number | null = null;
    const time = distance / velocity;
    let animationId: number;
    const screenWidth = document.body.clientWidth;
    const positionCar = (screenWidth / 100) * 15;
    const distanceAnimation = screenWidth - positionCar;
  
    function animate(timeStamp: number) {
      if (!start) {
        start = timeStamp;
      }
  
      const elapsed = timeStamp - start;
      const progress = Math.min(elapsed / time, 1);
  
      car.style.transform = `translateX(${progress * distanceAnimation}px)`;
  
      if (progress < 1) {
        animationId = window.requestAnimationFrame(animate);
        animations[id] = animationId
      }
  
      if (progress >= 1) {
        addWinner(id, time);
      }
    }
    animationId = window.requestAnimationFrame(animate);

    return animationId
  }
  
  async function addWinner(id: number, time: number) {
    try {
      const { wins } = await fetch(`${BASE_URL}/winner/${id}`);
  
      if (!wins) {
        await fetch(`${BASE_URL}/winners`, {
          method: "POST",
          body: JSON.stringify({
            id,
            wins: 1,
            time,
          }),
        });
      } else {
        await fetch(`${BASE_URL}/winners`, {
          method: "POST",
          body: JSON.stringify({
            id,
            wins: wins + 1,
            time,
          }),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }


export const editCar = async (id: number, name: string, color: string) => {
    const res = await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, color})
    })
    return await res.json()
}

export const deleteCar = async (id: number) => {
    const res = await fetch(`http://127.0.0.1:3000/garage/${id}`, {
        method: 'DELETE'
    })
    return await res.json()
}