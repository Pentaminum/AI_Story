if [ -x "$(command -v pip3)" ]
then
    pip3 install diffusers
    pip3 install invisible-watermark
    pip3 install transformers
    pip3 install accelerate
    pip3 install safetensors
    pip3 install timm
    pip3 install einops
elif [ -x "$(command -v pip)" ];
then
    pip install diffusers
    pip install invisible-watermark
    pip install transformers
    pip install accelerate
    pip install safetensors
    pip install timm
    pip install einops
else
    echo "command pip install could not be found"
    exit 1
fi

