from ultralytics import YOLO
import ultralytics

class Train:
    def __init__(self):
        ultralytics.checks()
        self.model = YOLO("yolo11n.pt")
    
    def train(self):
        results = self.model.train(data="coco8.yaml", 
                                   epochs=50, single_cls=True, device=0)
        print(results)
        self.model.val()
    
trainer = Train()
trainer.train()
